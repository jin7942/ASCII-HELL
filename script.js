const steps = document.querySelectorAll('.step');

steps.forEach((el) => {
    el.style.display = 'none';
});

let current = 0;
function showNextStep() {
    document.getElementById('fileName').className = 'file-name';
    if (current < steps.length) {
        steps[current].style.display = 'block';
        current++;
        setTimeout(showNextStep, 200);
    }
}

document.getElementById('fileInput').addEventListener('change', (e) => {
    const fileName = e.target.files[0]?.name;
    innerValue(fileName);
});

document.getElementById('imageInput').addEventListener('click', () => {
    toggleSection('image');
});
document.getElementById('textInput').addEventListener('click', () => {
    toggleSection('text');
});

const toggleSection = (type) => {
    const fileSection = document.getElementById('file-section');
    const textSection = document.getElementById('input-section');

    if (type === 'image') {
        fileSection.style.display = 'block';
        textSection.style.display = 'none';
    } else {
        fileSection.style.display = 'none';
        textSection.style.display = 'block';
    }
    document.getElementById('convertBtn').style.display = 'block';
};

document.getElementById('convertBtn').addEventListener('click', () => {
    const isImageMode = document.getElementById('file-section').style.display === 'block';
    const output = document.getElementById('ascii-output');

    if (isImageMode) {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('이미지를 선택해주세요.');
            return;
        }

        // 변환 단계 표시 함수 호출
        showNextStep();
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // 기존 ASCII 아트 제거
                output.innerHTML = '';

                // aalib.js를 사용하여 이미지 변환
                aalib.read.image
                    .fromURL(img.src)
                    .map(aalib.filter.contrast(0.9))
                    .map(aalib.aa({ width: 220, height: 100 }))
                    .map(aalib.filter.brightness(10))
                    .map(aalib.render.html({ el: output }))
                    .subscribe();
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);

        showBtn();
    } else {
        // 텍스트 모드 처리
        const inputText = document.getElementById('asciiText').value.trim();
        if (!inputText) {
            alert('텍스트를 입력해주세요.');
            return;
        }

        // 변환 단계 표시 함수 호출
        showNextStep();

        figlet(inputText, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            document.getElementById('ascii-output').textContent = data;
        });
        showBtn();
    }
});

const innerValue = (value) => {
    document.getElementById('fileName').innerHTML = `user@ascii-hell ~/ $ ascii-convert ~./${value}`;
};
document.getElementById('copyBtn').addEventListener('click', () => {
    const text = document.getElementById('ascii-output').textContent;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log('Copied to clipboard');
        })
        .catch((err) => {
            console.error('Copy failed', err);
        });
});

document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('ascii-output').textContent = '';
    document.getElementById('fileName').innerHTML = 'user@ascii-hell ~/ $';
    document.querySelectorAll('.step').forEach((step) => (step.style.display = 'none'));
    hideBtn();
    current = 0;
});

const showBtn = () => {
    document.getElementById('clearBtn').style.display = 'block';
    document.getElementById('copyBtn').style.display = 'block';
};
const hideBtn = () => {
    document.getElementById('clearBtn').style.display = 'none';
    document.getElementById('copyBtn').style.display = 'none';
};
