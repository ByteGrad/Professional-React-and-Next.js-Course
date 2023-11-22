import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

export default function Container() {
  return (
    <div className="container">
      <Header />
      <FeedbackList />
    </div>
  );
}
