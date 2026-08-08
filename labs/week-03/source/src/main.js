import './style.css';

const form = document.querySelector('#request-form');


// TODO 1: query preview/status/list elements
const previewName = document.querySelector('#preview-name');
const previewType = document.querySelector('#preview-type');
const previewDetails = document.querySelector('#preview-details');
const formStatus = document.querySelector('#form-status');
const requestList = document.querySelector('#request-list');

// TODO 2: readForm()
function readForm() {
  return {
    requesterName: document.querySelector('#requester-name').value,
    requestType: document.querySelector('#request-type').value,
    requestDetails: document.querySelector('#request-details').value
  };
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.requesterName || 'ยังไม่ระบุชื่อ';
  previewType.textContent = data.requestType || 'ยังไม่เลือกประเภท';
  previewDetails.textContent = data.requestDetails || 'ยังไม่มีรายละเอียด';
}

// TODO 4: validate(data)
function validate(data) {
  const errors = [];
  if (!data.requesterName.trim()) {
    errors.push('Please enter your name');
  }
  if (!data.requestType) {
    errors.push('Please select a request type');
  }
  if (!data.requestDetails.trim()) {
    errors.push('Please provide details');
  }
  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  formStatus.textContent = errors.join(', ');
  formStatus.className = 'status error';
}

// TODO 6: input and submit listeners

form.addEventListener('input', () => {
  const formData = readForm();
  renderPreview(formData);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = readForm();
  const errors = validate(formData);

  if (errors.length > 0) {
    renderErrors(errors);
    return;
  }

formStatus.textContent = 'Request submitted successfully!';
formStatus.className = 'status success';
  const item = document.createElement('li');

  item.innerHTML = `
    <strong>${formData.requesterName}</strong><br>
    Type: ${formData.requestType}<br>
    ${formData.requestDetails}
  `;

  requestList.appendChild(item);

  form.reset();

  renderPreview({
    requesterName: '',
    requestType: '',
    requestDetails: ''
  });
});


console.log('LAB 3 starter ready', form);