const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openSidebarBtn = document.getElementById("openSidebarBtn");
const closeSidebarBtn = document.getElementById("closeSidebarBtn");
const collapseSidebarBtn = document.getElementById("collapseSidebarBtn");
const navItems = document.querySelectorAll(".nav-item");
const tabLinks = document.querySelectorAll(".tab-link");
const panels = document.querySelectorAll(".panel");
const pageTitle = document.getElementById("pageTitle");
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const confirmModalBtn = document.getElementById("confirmModalBtn");
const toastContainer = document.createElement("div");
toastContainer.id = "toastContainer";
document.body.appendChild(toastContainer);

const authModal = document.getElementById("authModal");
const closeAuthModalBtn = document.getElementById("closeAuthModalBtn");
const authTabs = document.querySelectorAll(".auth-tab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authForms = document.querySelectorAll(".auth-form");

const mainApp = document.getElementById("mainApp");
const notificationsDropdown = document.getElementById("notificationsDropdown");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");

const attendanceForm = document.getElementById("attendanceForm");
const notesForm = document.getElementById("notesForm");
const assignmentForm = document.getElementById("assignmentForm");
const profileForm = document.getElementById("profileForm");

const attendanceTable = document.getElementById("attendanceTable");
const notesTable = document.getElementById("notesTable");
const assignmentsTable = document.getElementById("assignmentsTable");
const resultsTable = document.getElementById("resultsTable");
const feesTable = document.getElementById("feesTable");

const globalSearch = document.getElementById("globalSearch");
const globalSearchBtn = document.getElementById("globalSearchBtn");
const attendanceSearch = document.getElementById("attendanceSearch");
const notesSearch = document.getElementById("notesSearch");
const assignmentSearch = document.getElementById("assignmentSearch");
const resultsSearch = document.getElementById("resultsSearch");

const attendanceEmpty = document.getElementById("attendanceEmpty");
const notesEmpty = document.getElementById("notesEmpty");
const assignmentsEmpty = document.getElementById("assignmentsEmpty");
const resultsEmpty = document.getElementById("resultsEmpty");
const feesEmpty = document.getElementById("feesEmpty");

const attendanceId = document.getElementById("attendanceId");
const attendanceName = document.getElementById("attendanceName");
const attendanceRoll = document.getElementById("attendanceRoll");
const attendanceClass = document.getElementById("attendanceClass");
const attendanceStatus = document.getElementById("attendanceStatus");

const noteId = document.getElementById("noteId");
const noteSubject = document.getElementById("noteSubject");
const noteTitle = document.getElementById("noteTitle");
const noteDescription = document.getElementById("noteDescription");
const noteType = document.getElementById("noteType");
const noteSemester = document.getElementById("noteSemester");

const assignmentId = document.getElementById("assignmentId");
const assignmentTitle = document.getElementById("assignmentTitle");
const assignmentSubject = document.getElementById("assignmentSubject");
const assignmentDue = document.getElementById("assignmentDue");
const assignmentStatus = document.getElementById("assignmentStatus");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileRoll = document.getElementById("profileRoll");
const profileCourse = document.getElementById("profileCourse");
const profileAbout = document.getElementById("profileAbout");

const STORAGE_KEYS = {
  attendance: "attendanceData",
  notes: "notesData",
  assignments: "assignmentsData",
  results: "resultsData",
  fees: "feeData",
  profile: "studentProfile",
  theme: "theme",
  loggedIn: "loggedIn"
};

const defaults = {
  attendance: [
    { id: 1, name: "Aarav Sharma", roll: "CS101", cls: "BCA-2A", status: "Present" },
    { id: 2, name: "Neha Verma", roll: "CS102", cls: "BCA-2A", status: "Present" },
    { id: 3, name: "Rahul Singh", roll: "CS103", cls: "BCA-2A", status: "Late" }
  ],
  notes: [
    { id: 1, subject: "Web Development", title: "HTML Basics", description: "Intro to HTML", type: "PDF", semester: "Sem 2" }
  ],
  assignments: [
    { id: 1, title: "Build Landing Page", subject: "Web Dev", due: "2026-06-25", status: "Pending" },
    { id: 2, title: "JavaScript DOM Task", subject: "JS", due: "2026-06-27", status: "Submitted" }
  ],
  results: [
    { id: 1, student: "Aarav Sharma", subject: "Web Development", marks: 92, grade: "A+", remark: "Excellent" },
    { id: 2, student: "Neha Verma", subject: "JavaScript", marks: 88, grade: "A", remark: "Very Good" },
    { id: 3, student: "Rahul Singh", subject: "DBMS", marks: 79, grade: "B+", remark: "Good" }
  ],
  fees: [
    { id: 1, student: "Aarav Sharma", total: 50000, paid: 40000 },
    { id: 2, student: "Neha Verma", total: 50000, paid: 50000 },
    { id: 3, student: "Rahul Singh", total: 50000, paid: 20000 }
  ]
};

const getData = (key, fallback) => {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;
  try { return JSON.parse(stored); } catch { return fallback; }
};

let attendanceData = getData(STORAGE_KEYS.attendance, defaults.attendance);
let notesData = getData(STORAGE_KEYS.notes, defaults.notes);
let assignmentsData = getData(STORAGE_KEYS.assignments, defaults.assignments);
let resultsData = getData(STORAGE_KEYS.results, defaults.results);
let feeData = getData(STORAGE_KEYS.fees, defaults.fees);

function saveAll() {
  localStorage.setItem(STORAGE_KEYS.attendance, JSON.stringify(attendanceData));
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notesData));
  localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(assignmentsData));
  localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(resultsData));
  localStorage.setItem(STORAGE_KEYS.fees, JSON.stringify(feeData));
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function openModal(title, bodyHTML, confirmText = "OK", onConfirm = null) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  confirmModalBtn.textContent = confirmText;
  confirmModalBtn.onclick = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };
  modal.classList.add("show");
}

function closeModal() { modal.classList.remove("show"); }

function openAuthModal(tab = "login") {
  authModal.classList.remove("hidden");
  setAuthTab(tab);
}

function closeAuthModal() {
  authModal.classList.add("hidden");
}

function setAuthTab(tab) {
  authTabs.forEach((x) => x.classList.toggle("active", x.dataset.auth === tab));
  authForms.forEach((form) => form.classList.toggle("active", form.id === `${tab}Form`));
}

function validateField(input) {
  const error = input.parentElement.querySelector(".error");
  let msg = "";
  if (input.hasAttribute("required") && !input.value.trim()) msg = "Please fill out this field";
  else if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) msg = "Enter valid email";
  else if (input.hasAttribute("minlength") && input.value.trim().length < Number(input.minLength)) msg = `Minimum ${input.minLength} characters required`;
  if (error) error.textContent = msg;
  return !msg;
}

function validateForm(form) {
  let ok = true;
  form.querySelectorAll("input, textarea, select").forEach((el) => {
    if (!validateField(el)) ok = false;
  });
  return ok;
}

function statusTag(status) {
  const s = String(status).toLowerCase();
  if (["present", "completed", "paid"].includes(s)) return "success";
  if (s === "submitted") return "info";
  return "warning";
}

function emptyRow(colspan) {
  return `<tr><td colspan="${colspan}" style="text-align:center; padding:18px; color:var(--warning); font-weight:700;">Not Available</td></tr>`;
}

function filterList(data, fields, query) {
  const q = query.trim().toLowerCase();
  if (!q) return data;
  return data.filter((item) => fields.some((field) => String(item[field] ?? "").toLowerCase().includes(q)));
}

function setPageMeta(tabId) {
  const titles = {
    dashboard: "Dashboard",
    attendance: "Attendance",
    notes: "Notes",
    assignments: "Assignments",
    results: "Results",
    fees: "Fee Module",
    faculty: "Faculty Panel",
    recruiters: "Recruiters",
    profile: "Profile"
  };
  pageTitle.textContent = titles[tabId] || "Dashboard";
}

function openTab(tabId) {
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.tab === tabId));
  setPageMeta(tabId);
  renderAll();
  renderCharts();
  if (window.innerWidth <= 768) closeSidebar();
}

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

function renderAttendance(filter = "") {
  const filtered = filterList(attendanceData, ["name", "roll", "cls", "status"], filter);
  attendanceTable.innerHTML = filtered.length ? filtered.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.roll}</td>
      <td>${item.cls}</td>
      <td><span class="tag ${statusTag(item.status)}">${item.status}</span></td>
      <td class="actions">
        <button class="action-btn" onclick="editAttendance(${item.id})" type="button">Edit</button>
        <button class="action-btn" onclick="deleteAttendance(${item.id})" type="button">Delete</button>
      </td>
    </tr>
  `).join("") : emptyRow(5);
  attendanceEmpty?.classList.toggle("hidden", filtered.length !== 0);
}

function renderNotes(filter = "") {
  const filtered = filterList(notesData, ["subject", "title", "type", "semester"], filter);
  notesTable.innerHTML = filtered.length ? filtered.map((item) => `
    <tr>
      <td>${item.subject}</td>
      <td>${item.title}</td>
      <td>${item.type}</td>
      <td>${item.semester}</td>
      <td class="actions">
        <button class="action-btn" onclick="editNote(${item.id})" type="button">Edit</button>
        <button class="action-btn" onclick="deleteNote(${item.id})" type="button">Delete</button>
      </td>
    </tr>
  `).join("") : emptyRow(5);
  notesEmpty?.classList.toggle("hidden", filtered.length !== 0);
}

function renderAssignments(filter = "") {
  const filtered = filterList(assignmentsData, ["title", "subject", "status"], filter);
  assignmentsTable.innerHTML = filtered.length ? filtered.map((item) => `
    <tr>
      <td>${item.title}</td>
      <td>${item.subject}</td>
      <td>${item.due}</td>
      <td><span class="tag ${statusTag(item.status)}">${item.status}</span></td>
      <td class="actions">
        <button class="action-btn" onclick="editAssignment(${item.id})" type="button">Edit</button>
        <button class="action-btn" onclick="deleteAssignment(${item.id})" type="button">Delete</button>
      </td>
    </tr>
  `).join("") : emptyRow(5);
  assignmentsEmpty?.classList.toggle("hidden", filtered.length !== 0);
}

function renderResults(filter = "") {
  const filtered = filterList(resultsData, ["student", "subject", "grade", "remark"], filter);
  resultsTable.innerHTML = filtered.length ? filtered.map((item) => `
    <tr>
      <td>${item.student}</td>
      <td>${item.subject}</td>
      <td>${item.marks}</td>
      <td>${item.grade}</td>
      <td>${item.remark}</td>
      <td class="actions">
        <button class="action-btn" onclick="editResult(${item.id})" type="button">Edit</button>
        <button class="action-btn" onclick="deleteResult(${item.id})" type="button">Delete</button>
      </td>
    </tr>
  `).join("") : emptyRow(6);
  resultsEmpty?.classList.toggle("hidden", filtered.length !== 0);
}

function renderFees(filter = "") {
  const filtered = filterList(feeData, ["student"], filter);
  feesTable.innerHTML = filtered.length ? filtered.map((item) => {
    const due = item.total - item.paid;
    const status = due === 0 ? "Completed" : "Pending";
    return `
      <tr>
        <td>${item.student}</td>
        <td>₹${item.total}</td>
        <td>₹${item.paid}</td>
        <td>₹${due}</td>
        <td><span class="tag ${statusTag(status)}">${status}</span></td>
        <td class="actions">
          <button class="action-btn" onclick="editFee(${item.id})" type="button">Edit</button>
          <button class="action-btn" onclick="deleteFee(${item.id})" type="button">Delete</button>
        </td>
      </tr>
    `;
  }).join("") : emptyRow(6);
  feesEmpty?.classList.toggle("hidden", filtered.length !== 0);
}

function renderDonut(targetId, legendId, items) {
  const chart = document.getElementById(targetId);
  const legend = document.getElementById(legendId);
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let start = 0;
  const slices = items.map((item) => {
    const end = start + (item.value / total) * 100;
    const slice = `${item.color} ${start}% ${end}%`;
    start = end;
    return slice;
  });
  chart.style.background = `conic-gradient(${slices.join(", ")})`;
  legend.innerHTML = items.map((item) => {
    const percent = ((item.value / total) * 100).toFixed(1);
    return `
      <div class="legend-item">
        <div class="legend-left">
          <span class="legend-dot" style="background:${item.color}"></span>
          <span class="legend-name">${item.label}</span>
        </div>
        <span class="legend-value">${item.value} (${percent}%)</span>
      </div>
    `;
  }).join("");
}

function renderCharts() {
  const present = attendanceData.filter((x) => x.status === "Present").length;
  const absent = attendanceData.filter((x) => x.status === "Absent").length;
  const late = attendanceData.filter((x) => x.status === "Late").length;
  const paid = feeData.reduce((a, b) => a + b.paid, 0);
  const totalFee = feeData.reduce((a, b) => a + b.total, 0);
  const due = totalFee - paid;

  renderDonut("attendanceDonut", "attendanceLegend", [
    { label: "Present", value: present, color: "var(--primary)" },
    { label: "Absent", value: absent, color: "var(--accent)" },
    { label: "Late", value: late, color: "var(--warning)" }
  ]);

  renderDonut("feeDonut", "feeLegend", [
    { label: "Paid", value: paid, color: "var(--primary-2)" },
    { label: "Due", value: due, color: "var(--danger)" }
  ]);
}

function renderProfile() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile)) || {
    name: "Aarav Sharma",
    email: "student@college.com",
    roll: "CS101",
    course: "BCA",
    about: "This is a student profile section."
  };
  profileName.value = saved.name || "";
  profileEmail.value = saved.email || "";
  profileRoll.value = saved.roll || "";
  profileCourse.value = saved.course || "";
  profileAbout.value = saved.about || "";
}

function renderAll() {
  const q = globalSearch.value.trim();
  renderAttendance(q);
  renderNotes(q);
  renderAssignments(q);
  renderResults(q);
  renderFees(q);
  document.getElementById("statStudents").textContent = 1200 + attendanceData.length;
  document.getElementById("statPresent").textContent = 1000 + attendanceData.filter((x) => x.status === "Present").length;
  document.getElementById("statAssignments").textContent = assignmentsData.filter((x) => x.status !== "Completed").length;
  document.getElementById("statFees").textContent = feeData.filter((x) => x.total !== x.paid).length;
}

function clearAttendanceForm() {
  attendanceForm.reset();
  attendanceId.value = "";
  attendanceStatus.value = "Present";
}

function clearNotesForm() {
  notesForm.reset();
  noteId.value = "";
}

function clearAssignmentForm() {
  assignmentForm.reset();
  assignmentId.value = "";
  assignmentStatus.value = "Pending";
}

window.editAttendance = function (id) {
  const item = attendanceData.find((x) => x.id === id);
  if (!item) return;
  attendanceId.value = item.id;
  attendanceName.value = item.name;
  attendanceRoll.value = item.roll;
  attendanceClass.value = item.cls;
  attendanceStatus.value = item.status;
  openTab("attendance");
};

window.deleteAttendance = function (id) {
  openModal("Delete Attendance", "Do you want to delete this attendance record?", "Delete", () => {
    attendanceData = attendanceData.filter((x) => x.id !== id);
    saveAll();
    renderAll();
    renderCharts();
    showToast("Attendance deleted", "success");
  });
};

window.editNote = function (id) {
  const item = notesData.find((x) => x.id === id);
  if (!item) return;
  noteId.value = item.id;
  noteSubject.value = item.subject;
  noteTitle.value = item.title;
  noteDescription.value = item.description;
  noteType.value = item.type;
  noteSemester.value = item.semester;
  openTab("notes");
};

window.deleteNote = function (id) {
  openModal("Delete Note", "Do you want to delete this note?", "Delete", () => {
    notesData = notesData.filter((x) => x.id !== id);
    saveAll();
    renderAll();
    showToast("Note deleted", "success");
  });
};

window.editAssignment = function (id) {
  const item = assignmentsData.find((x) => x.id === id);
  if (!item) return;
  assignmentId.value = item.id;
  assignmentTitle.value = item.title;
  assignmentSubject.value = item.subject;
  assignmentDue.value = item.due;
  assignmentStatus.value = item.status;
  openTab("assignments");
};

window.deleteAssignment = function (id) {
  openModal("Delete Assignment", "Do you want to delete this assignment?", "Delete", () => {
    assignmentsData = assignmentsData.filter((x) => x.id !== id);
    saveAll();
    renderAll();
    showToast("Assignment deleted", "success");
  });
};

window.editResult = function (id) {
  const item = resultsData.find((x) => x.id === id);
  if (!item) return;
  openModal(
    "Edit Result",
    `<div class="field"><label>Student</label><input id="editResultStudent" value="${item.student}" /></div>
     <div class="field"><label>Subject</label><input id="editResultSubject" value="${item.subject}" /></div>
     <div class="field"><label>Marks</label><input id="editResultMarks" type="number" value="${item.marks}" /></div>
     <div class="field"><label>Grade</label><input id="editResultGrade" value="${item.grade}" /></div>
     <div class="field"><label>Remark</label><input id="editResultRemark" value="${item.remark}" /></div>`,
    "Save",
    () => {
      item.student = document.getElementById("editResultStudent").value.trim();
      item.subject = document.getElementById("editResultSubject").value.trim();
      item.marks = Number(document.getElementById("editResultMarks").value);
      item.grade = document.getElementById("editResultGrade").value.trim();
      item.remark = document.getElementById("editResultRemark").value.trim();
      saveAll();
      renderAll();
      showToast("Result updated", "success");
    }
  );
};

window.deleteResult = function (id) {
  openModal("Delete Result", "Do you want to delete this result?", "Delete", () => {
    resultsData = resultsData.filter((x) => x.id !== id);
    saveAll();
    renderAll();
    showToast("Result deleted", "success");
  });
};

window.editFee = function (id) {
  const item = feeData.find((x) => x.id === id);
  if (!item) return;
  openModal(
    "Edit Fee Record",
    `<div class="field"><label>Student</label><input id="editFeeStudent" value="${item.student}" /></div>
     <div class="field"><label>Total Fee</label><input id="editFeeTotal" type="number" value="${item.total}" /></div>
     <div class="field"><label>Paid</label><input id="editFeePaid" type="number" value="${item.paid}" /></div>`,
    "Save",
    () => {
      item.student = document.getElementById("editFeeStudent").value.trim();
      item.total = Number(document.getElementById("editFeeTotal").value);
      item.paid = Number(document.getElementById("editFeePaid").value);
      saveAll();
      renderAll();
      renderCharts();
      showToast(item.total === item.paid ? "Fee marked Completed" : "Fee updated", "success");
    }
  );
};

window.deleteFee = function (id) {
  openModal("Delete Fee Record", "Do you want to delete this fee record?", "Delete", () => {
    feeData = feeData.filter((x) => x.id !== id);
    saveAll();
    renderAll();
    renderCharts();
    showToast("Fee record deleted", "success");
  });
};

attendanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(attendanceForm)) return;
  const id = attendanceId.value ? Number(attendanceId.value) : Date.now();
  const item = {
    id,
    name: attendanceName.value.trim(),
    roll: attendanceRoll.value.trim(),
    cls: attendanceClass.value.trim(),
    status: attendanceStatus.value
  };
  attendanceData = attendanceId.value ? attendanceData.map((x) => (x.id === id ? item : x)) : [item, ...attendanceData];
  saveAll();
  clearAttendanceForm();
  showToast("Attendance saved", "success");
  renderAll();
  renderCharts();
});

notesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(notesForm)) return;
  const id = noteId.value ? Number(noteId.value) : Date.now();
  const item = {
    id,
    subject: noteSubject.value.trim(),
    title: noteTitle.value.trim(),
    description: noteDescription.value.trim(),
    type: noteType.value.trim(),
    semester: noteSemester.value.trim()
  };
  notesData = noteId.value ? notesData.map((x) => (x.id === id ? item : x)) : [item, ...notesData];
  saveAll();
  clearNotesForm();
  showToast("Note saved", "success");
  renderAll();
});

assignmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(assignmentForm)) return;
  const id = assignmentId.value ? Number(assignmentId.value) : Date.now();
  const item = {
    id,
    title: assignmentTitle.value.trim(),
    subject: assignmentSubject.value.trim(),
    due: assignmentDue.value,
    status: assignmentStatus.value
  };
  assignmentsData = assignmentId.value ? assignmentsData.map((x) => (x.id === id ? item : x)) : [item, ...assignmentsData];
  saveAll();
  clearAssignmentForm();
  showToast("Assignment saved", "success");
  renderAll();
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(profileForm)) return;
  localStorage.setItem(
    STORAGE_KEYS.profile,
    JSON.stringify({
      name: profileName.value.trim(),
      email: profileEmail.value.trim(),
      roll: profileRoll.value.trim(),
      course: profileCourse.value.trim(),
      about: profileAbout.value.trim()
    })
  );
  showToast("Profile saved", "success");
  renderProfile();
});

navItems.forEach((item) => item.addEventListener("click", () => openTab(item.dataset.tab)));
tabLinks.forEach((card) => card.addEventListener("click", () => openTab(card.dataset.tab)));

openSidebarBtn?.addEventListener("click", openSidebar);
closeSidebarBtn?.addEventListener("click", closeSidebar);
overlay.addEventListener("click", closeSidebar);
collapseSidebarBtn?.addEventListener("click", () => sidebar.classList.toggle("collapsed"));

themeToggle.addEventListener("click", () => {
  const next = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem(STORAGE_KEYS.theme, next);
  showToast(`Theme changed to ${next}`, "info");
  renderCharts();
});
themeToggleMobile?.addEventListener("click", () => themeToggle.click());

document.getElementById("notificationToggle").addEventListener("click", () => {
  notificationsDropdown.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (!notificationsDropdown.contains(e.target) && e.target.id !== "notificationToggle") {
    notificationsDropdown.classList.remove("show");
  }
});

loginBtn.addEventListener("click", () => openAuthModal("login"));
signupBtn.addEventListener("click", () => openAuthModal("register"));
closeAuthModalBtn.addEventListener("click", closeAuthModal);
authModal.addEventListener("click", (e) => {
  if (e.target === authModal) closeAuthModal();
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => setAuthTab(tab.dataset.auth));
});

function handleAuthSuccess(type) {
  localStorage.setItem(STORAGE_KEYS.loggedIn, "yes");
  closeAuthModal();
  authModal.classList.add("hidden");
  mainApp.classList.remove("hidden");
  showToast(type === "login" ? "Login successful" : "Sign up successful", "success");
  openTab(type === "login" ? "dashboard" : "profile");
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(loginForm)) return;
  handleAuthSuccess("login");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validateForm(registerForm)) return;
  handleAuthSuccess("register");
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEYS.loggedIn);
  showToast("Logged out", "info");
  mainApp.classList.add("hidden");
  authModal.classList.remove("hidden");
  setAuthTab("login");
  notificationsDropdown.classList.remove("show");
  closeSidebar();
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

document.getElementById("pdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("College ERP Report", 14, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Total Students: ${1200 + attendanceData.length}`, 14, 32);
  doc.text(`Present: ${1000 + attendanceData.filter((x) => x.status === "Present").length}`, 14, 40);
  doc.text(`Pending Assignments: ${assignmentsData.filter((x) => x.status !== "Completed").length}`, 14, 48);
  doc.text(`Pending Fees: ${feeData.filter((x) => x.total !== x.paid).length}`, 14, 56);
  doc.save("college-erp-report.pdf");
  showToast("PDF exported", "success");
});

document.getElementById("facultyActionBtn").addEventListener("click", () => showToast("Faculty action clicked", "success"));
document.getElementById("addAttendanceBtn").addEventListener("click", () => { openTab("attendance"); attendanceForm.scrollIntoView({ behavior: "smooth", block: "start" }); });
document.getElementById("newNoteBtn").addEventListener("click", () => { openTab("notes"); notesForm.scrollIntoView({ behavior: "smooth", block: "start" }); });
document.getElementById("newAssignmentBtn").addEventListener("click", () => { openTab("assignments"); assignmentForm.scrollIntoView({ behavior: "smooth", block: "start" }); });
document.getElementById("saveProfileBtn").addEventListener("click", () => profileForm.requestSubmit());

document.getElementById("addFeeBtn").addEventListener("click", () => {
  openModal(
    "Add Fee Record",
    `<div class="field"><label>Student</label><input id="newFeeStudent" required /></div>
     <div class="field"><label>Total Fee</label><input id="newFeeTotal" type="number" required /></div>
     <div class="field"><label>Paid</label><input id="newFeePaid" type="number" required /></div>`,
    "Save",
    () => {
      const student = document.getElementById("newFeeStudent").value.trim();
      const total = Number(document.getElementById("newFeeTotal").value);
      const paid = Number(document.getElementById("newFeePaid").value);
      if (!student || !total) return showToast("Please fill out this field", "error");
      feeData.unshift({ id: Date.now(), student, total, paid });
      saveAll();
      renderAll();
      renderCharts();
      showToast(paid === total ? "Fee marked Completed" : "Fee saved", "success");
    }
  );
});

cancelModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

function searchAllModules() {
  const q = globalSearch.value.trim();
  renderAttendance(q);
  renderNotes(q);
  renderAssignments(q);
  renderResults(q);
  renderFees(q);
}

function searchModule(module) {
  if (module === "attendance") renderAttendance(attendanceSearch.value.trim());
  if (module === "notes") renderNotes(notesSearch.value.trim());
  if (module === "assignments") renderAssignments(assignmentSearch.value.trim());
  if (module === "results") renderResults(resultsSearch.value.trim());
}

globalSearchBtn.addEventListener("click", searchAllModules);
globalSearch.addEventListener("keydown", (e) => { if (e.key === "Enter") searchAllModules(); });

document.querySelectorAll(".search-btn").forEach((btn) => {
  if (btn.id === "globalSearchBtn") return;
  btn.addEventListener("click", () => searchModule(btn.dataset.search));
});

[attendanceSearch, notesSearch, assignmentSearch, resultsSearch].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchModule(input.id.replace("Search", ""));
  });
});

attendanceSearch.addEventListener("input", () => searchModule("attendance"));
notesSearch.addEventListener("input", () => searchModule("notes"));
assignmentSearch.addEventListener("input", () => searchModule("assignments"));
resultsSearch.addEventListener("input", () => searchModule("results"));
globalSearch.addEventListener("input", searchAllModules);

document.querySelectorAll(".clickable-card").forEach((card) => {
  card.addEventListener("click", () => openTab(card.dataset.go));
});

const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
document.body.setAttribute("data-theme", savedTheme);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeSidebar();
});

function initializeApp() {
  renderProfile();
  saveAll();
  renderAll();
  renderCharts();

  const loggedIn = localStorage.getItem(STORAGE_KEYS.loggedIn) === "yes";
  if (loggedIn) {
    authModal.classList.add("hidden");
    mainApp.classList.remove("hidden");
    openTab("dashboard");
  } else {
    mainApp.classList.add("hidden");
    authModal.classList.remove("hidden");
    setAuthTab("login");
  }
}

initializeApp();