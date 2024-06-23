let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    if (n >= slides.length) {
        slideIndex = 0;
    }    
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (error) => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

const installButton = document.getElementById('install-button');
installButton.addEventListener('click', (e) => {
  // Hide the app provided install promotion
  hideInstallPromotion();
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
});
if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Hello World!', {
            body: 'This is a push notification.',
            icon: 'images/icon-192x192.png',
            tag: 'simple-push-demo-notification'
          });
        });
      }
    });
  }
  

  
//meeting room things , json 
let meetings = JSON.parse(localStorage.getItem('meetings')) || [];

document.querySelector('.schedule-button').addEventListener('click', function() {
    var title = document.getElementById('meetingTitle').value;
    var room = document.getElementById('meetingRoom').value;
    var date = document.getElementById('meetingDate').value;
    var time = document.getElementById('meetingTime').value;
    var duration = document.getElementById('meetingDuration').value;

    var modalMessage = '';

    if (!title || !room || !date || !time || !duration) {
        modalMessage = 'Please fill out all fields to schedule the meeting.';
    } else {
        // Check for scheduling conflicts
        var conflict = meetings.some(meeting => meeting.room === room && meeting.date === date && meeting.time === time);
        if (conflict) {
            modalMessage = 'A meeting is already scheduled in this room at this time. Please choose a different time or room.';
        } else {
            // Add the new meeting to the array
            meetings.push({ title, room, date, time, duration });
            // Save the updated meetings array to localStorage
            localStorage.setItem('meetings', JSON.stringify(meetings));
            modalMessage = 'Meeting scheduled successfully!';
        }
    }

    document.getElementById('modalMessage').textContent = modalMessage;
    document.getElementById('notificationModal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('notificationModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('notificationModal')) {
        document.getElementById('notificationModal').style.display = 'none';
    }
});

// book not working here 
document.addEventListener('DOMContentLoaded', () => {
    const books = JSON.parse(localStorage.getItem('books')) || [];

    function openForm() {
        document.getElementById('booklibForm').style.display = 'flex';
    }

    function closeForm() {
        document.getElementById('booklibForm').style.display = 'none';
    }

    function addBook(title, author, isbn, publishDate, attachment, summary) {
        const book = { title, author, isbn, publishDate, attachment, summary };
        const bookExists = books.some(b => b.title === title && b.author === author);

        if (bookExists) {
            alert('The book is already in the list.');
            return;
        }

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooks();
        closeForm();
    }

    function displayBooks() {
        const booksGrid = document.querySelector('.booklib-books-grid');
        booksGrid.innerHTML = `
            <div class="booklib-book add-book" onclick="openForm()">
                <p>Add book</p>
                <button>+</button>
            </div>
        `;
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('booklib-book');
            bookElement.innerHTML = `
                <img src="${book.attachment}" alt="${book.title}">
                <p>${book.title}</p>
            `;
            booksGrid.appendChild(bookElement);
        });
    }

    document.getElementById('booklib-attachment-input').addEventListener('change', function() {
        const fileName = this.files[0].name;
        document.getElementById('booklib-attachment-text').value = fileName;
    });

    document.querySelector('.booklib-publish-button').addEventListener('click', () => {
        const title = document.querySelector('.booklib-form-body input[placeholder="Book Title"]').value;
        const author = document.querySelector('.booklib-form-body input[placeholder="Author Name"]').value;
        const isbn = document.querySelector('.booklib-form-body input[placeholder="ISBN"]').value;
        const publishDate = document.querySelector('.booklib-form-body input[placeholder="Date / Month / Year"]').value;
        const attachment = document.getElementById('booklib-attachment-text').value;
        const summary = document.querySelector('.booklib-form-body textarea').value;

        if (!title || !author || !isbn || !publishDate || !attachment || !summary) {
            alert('Please fill out all fields.');
            return;
        }

        addBook(title, author, isbn, publishDate, attachment, summary);
    });

    window.openForm = openForm;
    window.closeForm = closeForm;
    displayBooks();
});

/* customer support not working here */

function openChat(userName, userMessage) {
    document.getElementById('customersupport-chatbox').style.display = 'flex';
    const chatMessages = document.querySelector('.customersupport-chatbox-messages');
    chatMessages.innerHTML = `
        <div class="customersupport-chat-message">
            <img src="send.png" alt="User Icon">
            <div>
                <strong>${userName}</strong>
                <p>${userMessage}</p>
            </div>
        </div>
    `;
}

function closeChat() {
    document.getElementById('customersupport-chatbox').style.display = 'none';
}

function sendMessage() {
    const chatInput = document.getElementById('customersupport-chat-input');
    if (chatInput.value.trim() !== '') {
        const chatMessages = document.querySelector('.customersupport-chatbox-messages');
        const newMessage = document.createElement('div');
        newMessage.className = 'customersupport-chat-message you';
        newMessage.innerHTML = `
            <div>
                <strong>You</strong>
                <p>${chatInput.value.trim()}</p>
            </div>
            <img src="lib.png" alt="You Icon">
        `;
        chatMessages.appendChild(newMessage);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.customersupport-reply-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const userName = event.target.closest('.customersupport-message').querySelector('strong').innerText;
            const userMessage = event.target.closest('.customersupport-message').querySelector('p').innerText;
            openChat(userName, userMessage);
        });
    });
});