// DARK MODE

const toggleBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

});

// NAVBAR SCROLL

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// BOUTON RETOUR EN HAUT

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
// COMPTEURS ANIMÉS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let current = 0;

            const increment = target / 100;

            const updateCounter = () => {

                if(current < target){

                    current += increment;

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                }else{

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// FADE IN

const sections = document.querySelectorAll(".fade-section");

const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => {
    sectionObserver.observe(section);
});
const filter = document.getElementById("filterCategory");

console.log("Filtre trouve :", filter);

if(filter){

    filter.addEventListener("change", () => {

        const value = filter.value;

        const cards = document.querySelectorAll(".freelance-card");

        cards.forEach(card => {

            if(value === "all" || card.dataset.category === value){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}
const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", (e) => {

e.preventDefault();

let valid = true;

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

document.getElementById("nameError").textContent = "";
document.getElementById("emailError").textContent = "";
document.getElementById("messageError").textContent = "";

 name.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    message.classList.remove("is-invalid");


if(name.value.trim() === ""){
document.getElementById("nameError").textContent =
"Le nom est obligatoire";
name.classList.add("is-invalid");
valid = false;

 
 name.classList.remove("is-invalid");
email.classList.remove("is-invalid");
message.classList.remove("is-invalid");
}

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email.value)){
document.getElementById("emailError").textContent =
"Email invalide";
email.classList.add("is-invalid");
valid = false;
}

if(message.value.trim().length < 20){
document.getElementById("messageError").textContent =
"Le message doit contenir au moins 20 caractères";
message.classList.add("is-invalid");
valid = false;
}

if(valid){
document.getElementById("successMessage").innerHTML =
'<div class="alert alert-success">Message envoyé avec succès !</div>';

form.reset();
}

});

}
