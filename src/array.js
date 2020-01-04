export function filter(subject, iterator) {
  const length = subject.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    if (iterator(subject[i], i, subject)) {
      result.push(subject[i]);
    }
  }
  return result;
}
