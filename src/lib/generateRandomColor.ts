export default function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const randomColorString = `#${randomColor}`;
  return randomColorString;
}
