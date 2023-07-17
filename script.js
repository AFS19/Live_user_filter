const result = document.querySelector("#result");
const filter = document.querySelector("#filter");

const listItems = [];
getData();

filter.addEventListener("input", (ev) => {
  filterData(ev.target.value);
});

async function getData() {
  const res = await fetch(`https://randomuser.me/api?results=1000`);
  const { results } = await res.json();

  // clear results
  result.innerHTML = "";
  results.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
    <img src="${user.picture.medium}" alt="${user.name.first}">
    <div class="user-info">
      <h4>${user.name.first} ${user.name.last}</h4>
      <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;
    result.appendChild(li);
  });
}

function filterData(value) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(value.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
