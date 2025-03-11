const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Rome", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is 5 + 7?",
      options: ["10", "12", "14", "15"],
      correct: "12",
    },
    {
      question: "Which is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Mars", "Venus"],
      correct: "Jupiter",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["William Shakespeare", "Jane Austen", "Mark Twain", "Charles Dickens"],
      correct: "William Shakespeare",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function loadQuestion() {
    const questionContainer = document.getElementById("quiz-question");
    const optionsContainer = document.getElementById("quiz-options");
    const feedback = document.getElementById("quiz-feedback");
  
    feedback.textContent = "";
    optionsContainer.innerHTML = "";
  
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
  
    currentQuestion.options.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.className = "quiz-option";
      li.addEventListener("click", () => checkAnswer(option, li));
      optionsContainer.appendChild(li);
    });
  }
  
  function checkAnswer(selectedAnswer, optionElement) {
    const feedback = document.getElementById("quiz-feedback");
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    document.querySelectorAll(".quiz-option").forEach((opt) => {
      opt.style.pointerEvents = "none";
    });
  
    if (selectedAnswer === currentQuestion.correct) {
      feedback.textContent = "🎉 Correct!";
      feedback.style.color = "green";
      score++;
      optionElement.style.backgroundColor = "#d4edda";
    } else {
      feedback.textContent = `❌ Wrong answer! The correct answer is ${currentQuestion.correct}.`;
      feedback.style.color = "red";
      optionElement.style.backgroundColor = "#f8d7da";
    }
  }
  
  document.getElementById("next-question").addEventListener("click", () => {
    const scoreDisplay = document.getElementById("quiz-score");
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      const questionContainer = document.getElementById("quiz-question");
      const optionsContainer = document.getElementById("quiz-options");
      questionContainer.textContent = "Quiz Complete! 🎉";
      optionsContainer.innerHTML = "";
      document.getElementById("quiz-feedback").textContent = "";
      document.getElementById("next-question").style.display = "none";
      scoreDisplay.textContent = `Your Score: ${score} / ${quizQuestions.length}`;
    }
  });
  
  loadQuestion();
  
  document.getElementById("fetch-joke").addEventListener("click", () => {
    const jokeElement = document.getElementById("joke");
    jokeElement.textContent = "Fetching a joke...";
    jokeElement.classList.add("loading");
  
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        jokeElement.classList.remove("loading");
        jokeElement.textContent = `😂 ${data.setup} - ${data.punchline}`;
      })
      .catch(() => {
        jokeElement.classList.remove("loading");
        jokeElement.textContent = "❌ Failed to fetch a joke! Please try again.";
      });
  });
  
  const images = [
    "images/anime.avif",
    "images/cars.webp",
    "images/narutosixpath.jpg",
    "images/cars2.cms",
  ];
  
  let currentImageIndex = 0;
  
  const carouselImage = document.getElementById("carousel-image");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");
  
  function updateCarouselImage() {
    carouselImage.src = images[currentImageIndex];
  }
  
  prevButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarouselImage();
  });
  
  nextButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarouselImage();
  });
  
  updateCarouselImage();
  