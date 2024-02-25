document.getElementById('imageUpload').addEventListener('change', function(e) {
    var file = this.files[0]; // 获取选定的文件
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var formData = new FormData();
         
            formData.append("image", e.target.result);
            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
                alert(data.isReal === "True" ? "This is a real image, not AI-generated." : "This is an AI-generated image!");
            
                document.getElementById('result').innerText = data.isReal === "True" ? "This is a real image, not AI-generated." : "This is an AI-generated image!";
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred. Please try again."); 
            });
        };
        reader.readAsDataURL(file); 
        document.getElementById('file-chosen').textContent = file.name; 
    }
});

function uploadImage() {
    var imageInput = document.getElementById('imageUpload');
    if (imageInput.files.length > 0) {
        var formData = new FormData();
        formData.append("image", imageInput.files[0]);

        
    }
}
