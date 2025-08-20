export function title(_options?: any) {
  return "text-xl font-bold"; // örnek sınıf
}
export function subtitle({ class: className = "" } = {}) {
  return `text-lg text-gray-600 ${className}`; // örnek sınıf
}