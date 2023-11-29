// Get current date
const currentDate = new Date();

// Get references to HTML elements
// Get references to HTML elements
const daysElement = document.querySelector('.days');
const currentMonthYearElement = document.getElementById('currentMonthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');

// Variable to store the selected date element
let selectedDateElement = null;

// Function to update calendar
function updateCalendar(year, month) {
    // Clear the previous calendar content
    daysElement.innerHTML = '';

    // Set the current month and year
    currentMonthYearElement.textContent = `${getMonthName(month)} ${year}`;

    // Array to store days of the week starting from Monday
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Display days of the week
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('day-name');
        daysElement.appendChild(dayElement);
    });

    // Get the first day of the month and the total days in the month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Determine the starting position for the first day of the month
    let startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Fill in preceding days if the first day doesn't start on Monday
    for (let i = 0; i < startOffset; i++) {
        const emptyDayElement = document.createElement('div');
        emptyDayElement.classList.add('day-blank');
        daysElement.appendChild(emptyDayElement);
    }

    // Loop through each day in the month
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        // Highlight the current date
        if (isSameDate(date, new Date())) {
            dayElement.classList.add('current-date');
        }

        // Event listener for selecting a date
        dayElement.addEventListener('click', (event) => {
            const clickedDateElement = event.target;

            // Remove the border from the previously selected date
            if (selectedDateElement) {
                selectedDateElement.classList.remove('selected-date');
            }

            // Highlight the clicked date and update selectedDateElement
            if (clickedDateElement !== daysElement) {
                clickedDateElement.classList.add('selected-date');
                selectedDateElement = clickedDateElement;

                // Extract year, month, and day from the selected date
                const selectedYear = year;
                const selectedMonth = month;
                const selectedDay = clickedDateElement.textContent;

                // Update the selected date display
                updateSelectedDateDisplay(selectedYear, selectedMonth, selectedDay);
            }
        });

        daysElement.appendChild(dayElement);
    }

    // Set default selected date
    updateSelectedDateDisplay(year, month, new Date().getDate());
}

// Function to check if two dates are the same
function isSameDate(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}

// Function to get month name
function getMonthName(monthIndex) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
}

// Function to update selected date display
function updateSelectedDateDisplay(year, month, day) {
    const formattedDate = `${getMonthName(month)} ${day}, ${year} |`;

    selectedDateDisplay.value = formattedDate;
}

// Event listeners for changing months
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Initial load
updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
