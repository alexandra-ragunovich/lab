const events = {}; 

function createCalendar(year) {
    const calendarElement = document.getElementById('calendar');
    calendarElement.innerHTML = ''; 
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        const monthName = document.createElement('div');
        monthName.classList.add('month-name');
        monthName.innerText = month;
        monthDiv.appendChild(monthName);

        
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        
        weekDays.forEach(day => {
            const th = document.createElement('th');
            th.innerText = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        
        const daysInMonth = new Date(year, index + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, index, 1).getDay();

        const emptyCells = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        
        let row = document.createElement('tr');
        for (let i = 0; i < emptyCells; i++) {
            const td = document.createElement('td');
            row.appendChild(td);
        }

        
        for (let day = 1; day <= daysInMonth; day++) {
            const td = document.createElement('td');
            td.innerText = day;
            td.dataset.date = `${year}-${String(index + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; 

           
            td.addEventListener('click', function () {
                document.getElementById('dateInput').value = td.dataset.date; 
            });

            
            if (events[td.dataset.date]) {
                td.classList.add('event-day'); 
                td.addEventListener('mouseenter', function () {
                    showModal(events[td.dataset.date], td); 
                });
                td.addEventListener('mouseleave', closeModal); 
            }

            row.appendChild(td);

            
            if ((day + emptyCells) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        }

        
        tbody.appendChild(row);
        table.appendChild(tbody);
        monthDiv.appendChild(table);
        calendarElement.appendChild(monthDiv);
    });
}

function addEvent() {
    const dateInput = document.getElementById('dateInput').value;
    const eventInput = document.getElementById('eventInput').value;

    if (dateInput && eventInput) {
        events[dateInput] = eventInput;
        createCalendar(new Date(dateInput).getFullYear()); 
        
        document.getElementById('dateInput').value = '';
        document.getElementById('eventInput').value = '';
    } else {
        alert("Пожалуйста, выберите дату и введите событие.");
    }
}


document.getElementById('eventInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addEvent();
    }
});

document.getElementById('yearInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        generateCalendar();
    }
});

function showModal(eventText, targetCell) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-event-text');
    modalText.innerText = eventText; 
    modal.style.display = 'block';
   
    const rect = targetCell.getBoundingClientRect();
    modal.style.top = `${rect.bottom + window.scrollY}px`; 
    modal.style.left = `${rect.left + window.scrollX}px`;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none'; 
}

function generateCalendar() {
    const yearInput = document.getElementById('yearInput').value;
    const year = yearInput ? parseInt(yearInput) : new Date().getFullYear();
    createCalendar(year);
}
function toggleDropdown() {
    const dropdown = document.getElementById('yearDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

function setYear(year) {
    document.getElementById('yearInput').value = year; 
    toggleDropdown(); 
}


generateCalendar();