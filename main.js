const inputSearch = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchButton");
const phonesContainer = document.getElementById("phonesContainer");
const showAll = document.getElementById("showAll");
const beforeSearch = document.getElementById("beforeSearch");
const loader = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

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
  modal.classList.remove("hidden");
  modalContent.innerHTML = "";
  modalContent.innerHTML = `<span class="loading loading-ring loading-lg w-52"></span>`;
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createModal(data.data);
    });
};

const createModal = (phoneInfo) => {
  let modalInner = `
    
        <div class="w-[90%] mx-auto  bg-slate-500 rounded-lg py-4">
          <img  class="mx-auto rounded-lg w-[110px]" src=" ${
            phoneInfo.image
          }" alt="" />
        </div>
        <div class="w-[90%] mx-auto mt-4">
          <p class="text-3xl font-bold mb-4 capitalize text-center">
            ${phoneInfo.name}
          </p>
          <p class="text-lg font-semibold mb-1">
            Storage:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.mainFeatures.storage
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            Display Size:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.mainFeatures.displaySize
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            Chipset:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.mainFeatures.chipSet
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            Memory:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.mainFeatures.memory
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            Release data:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.releaseDate
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            Brand:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo.brand
            }</span>
          </p>
          <p class="text-lg font-semibold mb-1">
            GPS:
            <span class="font-normal text-stone-800 text-base">${
              phoneInfo?.others ? phoneInfo.others.GPS : "No GPS Feature"
            }</span>
          </p>
          <div class="flex">
            <button onclick="closeModal()" class="btn btn-sm my-4 mx-auto block capitalize">
              Close
            </button>
            <button onclick="savePDF()" class="btn btn-sm my-4 mx-auto block capitalize">
              Save PDF
            </button>
          </div>
        </div>
     
    `;
  modalContent.innerHTML = modalInner;
};
const closeModal = () => {
  modal.classList.add("hidden");
};
const savePDF = () => {
  let opt = {
    margin: 0.7,
    filename: "Phone Details",
    image: { type: "jpg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf(modalContent, opt);
};
