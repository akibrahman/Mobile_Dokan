const inputSearch = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchButton");
const phonesContainer = document.getElementById("phonesContainer");
const showAll = document.getElementById("showAll");
const beforeSearch = document.getElementById("beforeSearch");
const loader = document.getElementById("loader");

searchButton.addEventListener("click", () => {
  let inputSearchText = inputSearch.value;
  if (inputSearchText === "") {
    alert("Enter Something..");
  } else {
    phonesContainer.innerHTML = "";
    beforeSearch.classList.add("hidden");
    loader.classList.remove("hidden");
    loadData(inputSearchText);
  }
});

const loadData = (searchedPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`;
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      let phones = data.data;
      console.log(phones.length);
      loader.classList.add("hidden");
      displaPhonesChecker(phones);
    });
};

const displaPhonesChecker = (phones) => {
  if (phones.length === 0) {
    beforeSearch.classList.remove("hidden");
    beforeSearch.innerText = "No match found!";
  }
  showAll.addEventListener("click", () => {
    displaPhones(phones);
    showAll.classList.add("hidden");
  });
  if (phones.length <= 9) {
    showAll.classList.add("hidden");
    displaPhones(phones);
  } else {
    let shortPhones = phones.slice(0, 9);
    displaPhones(shortPhones);
    showAll.classList.remove("hidden");
  }
};

const displaPhones = (phonesArray) => {
  phonesArray.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add(
      "w-96",
      "p-5",
      "border",
      "rounded-md",
      "flex",
      "flex-col",
      "items-center",
      "gap-4"
    );
    div.innerHTML = `
           <div class="bg-slate-700 w-full py-10 rounded-md">
           <img
             src="${element.image}"
             alt=""
             class="block mx-auto rounded-lg scale-90"
           />
         </div>
         <h1 class="text-2xl font-bold">${element.phone_name}</h1>
         <p class="text-center text-lg">
           There are many variations of passages of available, but the
           majority have suffered
         </p>
         <p class="text-2xl font-bold">$999</p>
         <button onclick="displayModal('${element.slug}')" class="btn tbn-sm btn-info capitalize font-bold text-lg">
           show details
         </button>
      `;
    phonesContainer.appendChild(div);
  });
};

const displayModal = (slug) => {
  console.log(slug);
};
