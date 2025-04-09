document.getElementById('fileInput').addEventListener('change', (e) => {
    const fileName = e.target.files[0]?.name || 'no file selected';
    document.getElementById('fileName').textContent = `: ${fileName}`;
});
