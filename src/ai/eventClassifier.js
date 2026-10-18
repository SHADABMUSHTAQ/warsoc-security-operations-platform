// Small, transparent Multinomial Naive Bayes model trained in the browser.
// Examples are synthetic and contain no customer or production telemetry.
export const TRAINING_EXAMPLES = [
  ["credential abuse", "many failed login attempts for admin from unfamiliar address"],
  ["credential abuse", "repeated password failures on administrator account"],
  ["credential abuse", "brute force authentication attempts from remote source"],
  ["credential abuse", "multiple invalid passwords followed by successful login"],
  ["credential abuse", "account lockout after failed sign in attempts"],
  ["credential abuse", "unusual login attempts against privileged user"],
  ["credential abuse", "password spraying detected for several accounts"],
  ["credential abuse", "remote authentication failure repeated for admin user"],
  ["script execution", "encoded powershell command launched on workstation"],
  ["script execution", "suspicious script executed through powershell process"],
  ["script execution", "command line started hidden powershell with encoded payload"],
  ["script execution", "unexpected shell script launched by office application"],
  ["script execution", "powershell downloaded and ran a remote script"],
  ["script execution", "unsigned script execution on endpoint"],
  ["script execution", "obfuscated command executed from temporary directory"],
  ["script execution", "macro spawned command shell with encoded arguments"],
  ["network anomaly", "workstation contacted unfamiliar outbound destination"],
  ["network anomaly", "large data transfer to unusual external address"],
  ["network anomaly", "unexpected outbound connection to low reputation host"],
  ["network anomaly", "network traffic spike toward unknown remote domain"],
  ["network anomaly", "endpoint beaconing to external destination repeatedly"],
  ["network anomaly", "unusual dns queries and outbound connections"],
  ["network anomaly", "connection to suspicious destination on rare port"],
  ["network anomaly", "unexpected external upload from internal host"],
  ["routine activity", "user successfully signed in from known workstation"],
  ["routine activity", "scheduled backup completed successfully"],
  ["routine activity", "antivirus definitions updated on endpoint"],
  ["routine activity", "administrator approved routine software update"],
  ["routine activity", "normal login from trusted office network"],
  ["routine activity", "scheduled health check completed without errors"],
  ["routine activity", "system service started after planned restart"],
  ["routine activity", "approved user session ended normally"],
];

const tokens = (value) =>
  String(value).toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) || [];

export function trainEventClassifier(examples = TRAINING_EXAMPLES) {
  const labels = [...new Set(examples.map(([label]) => label))];
  const vocabulary = new Set();
  const counts = Object.fromEntries(labels.map((label) => [label, new Map()]));
  const totals = Object.fromEntries(labels.map((label) => [label, 0]));
  const documents = Object.fromEntries(labels.map((label) => [label, 0]));

  for (const [label, text] of examples) {
    documents[label] += 1;
    for (const token of tokens(text)) {
      vocabulary.add(token);
      counts[label].set(token, (counts[label].get(token) || 0) + 1);
      totals[label] += 1;
    }
  }

  return { labels, vocabulary, counts, totals, documents, exampleCount: examples.length };
}

const MODEL = trainEventClassifier();

export function classifySecurityEvent(input, model = MODEL) {
  const words = tokens(input);
  if (!words.length) return null;

  const knownWords = words.filter((word) => model.vocabulary.has(word));
  if (!knownWords.length) {
    return { label: "unknown", evidence: [], coverage: 0, scores: [] };
  }

  const vocabularySize = model.vocabulary.size;
  const scores = model.labels.map((label) => {
    let logScore = Math.log(model.documents[label] / model.exampleCount);
    for (const word of knownWords) {
      const count = model.counts[label].get(word) || 0;
      logScore += Math.log((count + 1) / (model.totals[label] + vocabularySize));
    }
    return { label, logScore };
  }).sort((a, b) => b.logScore - a.logScore);

  const winner = scores[0];
  const unique = [...new Set(knownWords)];
  const evidence = unique.map((word) => {
    const winningWeight = Math.log(((model.counts[winner.label].get(word) || 0) + 1) / (model.totals[winner.label] + vocabularySize));
    const otherWeight = Math.max(...model.labels.filter((label) => label !== winner.label).map((label) =>
      Math.log(((model.counts[label].get(word) || 0) + 1) / (model.totals[label] + vocabularySize))));
    return { word, contribution: winningWeight - otherWeight };
  }).filter(({ contribution }) => contribution > 0).sort((a, b) => b.contribution - a.contribution).slice(0, 4).map(({ word }) => word);

  return {
    label: winner.label,
    evidence,
    coverage: knownWords.length / words.length,
    scores: scores.map(({ label, logScore }) => ({ label, logScore })),
  };
}
