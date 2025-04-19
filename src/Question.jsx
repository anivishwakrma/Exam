import React, { useState } from 'react';

const questions = [{ id: 1, question: 'What is the default file extension of MS Word? / MS Word की डिफ़ॉल्ट फाइल एक्सटेंशन क्या है?', options: ['.txt', '.doc', '.xls', '.ppt'], answer: '.doc', marks: 1 },
  { id: 2, question: 'Which tab contains the option to change the page orientation? / किस टैब में पेज ओरिएंटेशन बदलने का विकल्प होता है?', options: ['Insert', 'View', 'Layout', 'Home'], answer: 'Layout', marks: 1 },
  { id: 3, question: 'Shortcut for saving a document is? / डॉक्यूमेंट सेव करने का शॉर्टकट क्या है?', options: ['Ctrl + S', 'Ctrl + C', 'Ctrl + V', 'Ctrl + X'], answer: 'Ctrl + S', marks: 1 },
  { id: 4, question: 'Which key is used to open a new document in MS Word? / नया डॉक्यूमेंट खोलने के लिए कौन सी कुंजी का उपयोग होता है?', options: ['Ctrl + N', 'Ctrl + A', 'Ctrl + B', 'Ctrl + P'], answer: 'Ctrl + N', marks: 1 },
  { id: 5, question: 'Which option is used to align text to both left and right margins? / टेक्स्ट को दोनों ओर से अलाइन करने के लिए कौन सा विकल्प उपयोग किया जाता है?', options: ['Align Left', 'Align Right', 'Center', 'Justify'], answer: 'Justify', marks: 1 },
  

];

const Question = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    });
  };

  const handleSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const time = new Date().toISOString();
    let total = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        total += q.marks;
      }
    });
    setScore(total);
    setSubmitted(true);
    if (!userData || !userData.name || !userData.dob) {
      alert("User data missing.");
      return;
    }

    const payload = {
      name: userData.name,
      dob: userData.dob,
      total,
      time,
    };
    console.log(payload);

    try {
      const res = await fetch("http://localhost:5000/api/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        alert("Score submitted successfully!");
      } else {
        alert("Error submitting score.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error.");
    }
   
  };

  const allAttempted = questions.length === Object.keys(answers).length;

  return (
    <div className="App">
    <h1>MS Word Quiz</h1>
    {questions.map((q) => (
      <div key={q.id} className="question-block">
        <h3>{q.id}. {q.question}</h3>
        <p><strong>{q.hindi}</strong></p>
        {q.options.map((opt) => (
          <div key={opt}>
            <label>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleOptionChange(q.id, opt)}
                disabled={submitted}
              />
              {opt}
            </label>
          </div>
        ))}
      </div>
    ))}

    <button onClick={handleSubmit} disabled={!allAttempted || submitted}>
      Submit
    </button>

    {submitted && (
      <div className="result">
        <h2>Result: {score} / {questions.reduce((sum, q) => sum + q.marks, 0)}</h2>
      </div>
    )}
  </div>
  );
}

export default Question;
