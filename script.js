let bugId = localStorage.getItem("bugId") ? parseInt(localStorage.getItem("bugId")) : 1;
let bugs = JSON.parse(localStorage.getItem("bugs")) || [];

// Render existing bugs
function renderBugs() {
  let table = document.getElementById("bugTable");
  table.innerHTML = `<tr>
    <th>ID</th><th>Title</th><th>Description</th><th>Priority</th><th>Status</th><th>Actions</th>
  </tr>`;
  bugs.forEach((bug, index) => {
    let row = table.insertRow();
    row.insertCell(0).innerText = bug.id;
    row.insertCell(1).innerText = bug.title;
    row.insertCell(2).innerText = bug.desc;
    row.insertCell(3).innerText = bug.priority;
    row.insertCell(4).innerText = bug.status;
    row.insertCell(5).innerHTML = `
      <button class="btn edit" onclick="editBug(${index})">Edit</button>
      <button class="btn delete" onclick="deleteBug(${index})">Delete</button>
    `;
  });
}

// Add new bug
document.getElementById("bugForm").addEventListener("submit", function(e){
  e.preventDefault();
  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;

  let bug = { id: bugId++, title, desc, priority, status };
  bugs.push(bug);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  localStorage.setItem("bugId", bugId);
  renderBugs();
  document.getElementById("bugForm").reset();
});

// Edit bug
function editBug(index) {
  let bug = bugs[index];
  document.getElementById("title").value = bug.title;
  document.getElementById("desc").value = bug.desc;
  document.getElementById("priority").value = bug.priority;
  document.getElementById("status").value = bug.status;
  deleteBug(index); // remove old entry before re-adding
}

// Delete bug
function deleteBug(index) {
  bugs.splice(index, 1);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  renderBugs();
}

// Initial render
renderBugs();
