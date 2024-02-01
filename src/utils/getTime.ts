export default function getTime(): string {
  let message = "";
  const hours = new Date().getHours();
  if (hours <= 9) {
    message = "早上好";
  } else if (hours <= 12) {
    message = "上午好";
  } else if (hours <= 18) {
    message = "下午好";
  } else if (hours <= 24) {
    message = "晚上好";
  }
  return message;
}
