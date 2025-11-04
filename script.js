document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate On Scroll)
    AOS.init({
        // Optional: Settings for smooth, non-repetitive animations
        duration: 800,        // duration of the animation
        once: true,           // whether animation should only happen once - important for performance
        mirror: false,        // whether elements should animate out while scrolling past them
    });

    const curriculumContainer = document.getElementById('curriculum');
    const progressSummary = document.getElementById('progress-summary');
    const courseItems = curriculumContainer.querySelectorAll('.course-item');
    
    // Total courses is dynamically determined from the HTML (now 40)
    const totalCourses = courseItems.length; 

    function loadProgress() {
        courseItems.forEach(item => {
            const button = item.querySelector('.complete-btn');
            const courseId = button.dataset.course;
            
            // Check Local Storage for completion status
            if (localStorage.getItem(courseId) === 'true') {
                item.classList.add('completed');
                button.textContent = 'Completed (Undo)';
                // Change button style to primary/success for completed state
                button.classList.remove('btn-outline-success');
                button.classList.add('btn-success');
            }
        });
        updateProgressSummary();
    }

    function updateProgressSummary() {
        const completedCourses = curriculumContainer.querySelectorAll('.course-item.completed').length;
        const percentage = totalCourses > 0 ? ((completedCourses / totalCourses) * 100).toFixed(0) : 0;
        progressSummary.textContent = `Your Progress: ${completedCourses}/${totalCourses} courses (${percentage}%)`;
    }

    // Mark Complete Button Handler
    curriculumContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('complete-btn')) {
            const button = event.target;
            const item = button.closest('.course-item');
            const courseId = button.dataset.course;

            if (item.classList.contains('completed')) {
                // Mark as incomplete
                item.classList.remove('completed');
                button.textContent = 'Mark Complete';
                button.classList.remove('btn-success');
                button.classList.add('btn-outline-success');
                localStorage.removeItem(courseId);
            } else {
                // Mark as complete
                item.classList.add('completed');
                button.textContent = 'Completed (Undo)';
                button.classList.remove('btn-outline-success');
                button.classList.add('btn-success');
                localStorage.setItem(courseId, 'true');
            }
            updateProgressSummary();
        }
    });

    // Initialize the website state
    loadProgress();
});