import json, os, random
from typing import List, Dict
from datasets import load_dataset, Dataset
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, DataCollatorForSeq2Seq, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

MODEL_NAME = "google/flan-t5-base"
MAX_IN_LEN = 1024
MAX_OUT_LEN = 192

def read_jsonl(path):
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            yield json.loads(line)

def format_example(ex):
    # Turn snippets into a compact context block
    # You can tune this prompt!
    ctx_lines = [f"- {s['title']}: {s['snippet']}" for s in ex["snippets"][:6]]
    ctx = "\n".join(ctx_lines)
    prompt = (
        "You are a helpful assistant. Read the snippets and answer the user's question "
        "concisely with citations (numbers in brackets) if useful.\n\n"
        f"Question: {ex['query']}\n\n"
        "Snippets:\n" + ctx + "\n\n"
        "Answer:"
    )
    return {"input_text": prompt, "target_text": ex["answer"]}

def build_dataset(train_path, valid_ratio=0.05):
    data = list(read_jsonl(train_path))
    random.shuffle(data)
    n_valid = max(1, int(len(data) * valid_ratio))
    valid = data[:n_valid]
    train = data[n_valid:]
    return Dataset.from_list([format_example(x) for x in train]), Dataset.from_list([format_example(x) for x in valid])

def main():
    train_file = "train.jsonl"  # <- your path
    out_dir = "flan_t5_base_lora_search"
    os.makedirs(out_dir, exist_ok=True)

    train_ds, valid_ds = build_dataset(train_file)

    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

    # LoRA config (adjust r/alpha if you have more data/compute)
    lora_cfg = LoraConfig(
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        target_modules=["q","v"],  # works well on T5 attention
        task_type="SEQ_2_SEQ_LM"
    )
    model = get_peft_model(model, lora_cfg)

    def tok(batch):
        model_inputs = tokenizer(
            batch["input_text"],
            max_length=MAX_IN_LEN,
            truncation=True
        )
        with tokenizer.as_target_tokenizer():
            labels = tokenizer(
                batch["target_text"],
                max_length=MAX_OUT_LEN,
                truncation=True
            )
        model_inputs["labels"] = labels["input_ids"]
        return model_inputs

    train_tok = train_ds.map(tok, batched=False)
    valid_tok = valid_ds.map(tok, batched=False)

    data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)

    args = TrainingArguments(
        output_dir=out_dir,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        num_train_epochs=3,
        evaluation_strategy="steps",
        eval_steps=200,
        save_steps=200,
        logging_steps=50,
        predict_with_generate=True,
        generation_max_length=MAX_OUT_LEN,
        bf16=True if torch.cuda.is_available() else False,
        fp16=True if not torch.cuda.is_available() else False,  # safe fallback
        save_total_limit=2,
        report_to=[],
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False
    )

    def compute_metrics(eval_pred):
        # Optional: add ROUGE here. Keeping simple.
        return {}

    trainer = Trainer(
        model=model,
        args=args,
        train_dataset=train_tok,
        eval_dataset=valid_tok,
        data_collator=data_collator,
        tokenizer=tokenizer,
        compute_metrics=compute_metrics
    )

    trainer.train()
    # Save only LoRA adapter (small!)
    model.save_pretrained(os.path.join(out_dir, "lora_adapter"))
    tokenizer.save_pretrained(out_dir)

if __name__ == "__main__":
    import torch
    main()
