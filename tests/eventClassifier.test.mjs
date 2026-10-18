import test from "node:test";
import assert from "node:assert/strict";
import { classifySecurityEvent, trainEventClassifier, TRAINING_EXAMPLES } from "../src/ai/eventClassifier.js";

test("the browser model trains on labelled synthetic examples", () => {
  const model = trainEventClassifier();
  assert.equal(model.exampleCount, TRAINING_EXAMPLES.length);
  assert.deepEqual(model.labels, ["credential abuse", "script execution", "network anomaly", "routine activity"]);
});

test("unseen event descriptions get useful categories", () => {
  const cases = [
    ["Encoded PowerShell command detected on workstation", "script execution"],
    ["Multiple failed authentication attempts from a new source", "credential abuse"],
    ["Endpoint contacted a low-reputation outbound destination", "network anomaly"],
    ["Scheduled backup completed successfully on the workstation", "routine activity"],
  ];
  for (const [text, expected] of cases) {
    const result = classifySecurityEvent(text);
    assert.equal(result.label, expected, text);
    assert.ok(result.coverage > 0);
  }
});

test("unrecognized text is not assigned a misleading category", () => {
  assert.equal(classifySecurityEvent("xyzzy florp").label, "unknown");
  assert.equal(classifySecurityEvent("   "), null);
});
