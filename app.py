from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import base64
import io

app = Flask(__name__)
CORS(app)

# 加载模型
model = tf.keras.models.load_model('model/ai_imageclassifier')

@app.route('/predict', methods=['POST'])
def predict():
    # 从请求中获取图片文件
    image_file = request.form['image']
    if image_file:
        # 将图片文件读取为Pillow图像
        image = Image.open(io.BytesIO(base64.b64decode(image_file[23:]))).convert("RGB")
        print(image)
        # 调整图片大小以符合模型输入
        image = image.resize((32, 32))
        # 将图片转换为numpy数组，并归一化
        image_array = np.expand_dims(np.array(image) / 255.0, axis=0)

        # 使用模型进行预测
        prediction = model.predict(image_array)
        
        # 假设模型返回的是二分类的概率，取第一个值作为示例
        is_real = prediction[0][0] > 0.5  # 根据您的模型调整这里的逻辑
        print(is_real)
        # 返回预测结果
        return jsonify({'isReal': str(is_real)})

    else:
        return jsonify({'error': 'No image uploaded'}), 400

if __name__ == '__main__':
    app.run(debug=True)
