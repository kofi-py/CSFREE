async function loadQuestions() {
    const response = await fetch('./data/questions.json');
    const questions = await response.json();

    const container = document.getElementById('questions-list');
    container.innerHTML = '';

    questions.forEach(q => {
        const card = document.createElement('div');
        card.className = 'question-card bg-dark border-secondary p-3 mb-3 rounded';

        card.innerHTML = `
            <a href="question.html?id=${q.id}" class="text-decoration-none">
                <div class="question-title text-primary fw-bold mb-1">${q.title}</div>
                <div class="question-body text-light mb-1">${q.body}</div>
                <div class="question-tags text-secondary small">tags: ${q.tags.join(', ')}</div>
                <div class="question-votes text-secondary small">votes: ${q.votes}</div>
            </a>
        `;

        container.appendChild(card);
    });

    // animation logic
    const cards = document.querySelectorAll(".question-card");

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, index * 150);
    });
}

loadQuestions();

