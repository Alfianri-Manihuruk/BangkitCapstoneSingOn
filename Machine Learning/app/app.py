from flask import Flask, render_template, request
from tensorflow.keras.preprocessing import image
import matplotlib as plt
import io
from PIL import Image
import numpy as np
import tensorflow as tf


app = Flask(__name__)

# for template
@app.route('/', methods= ['GET'])
def template():
    return render_template('index.html')

# for model
@app.route('/', methods=['POST'])
def predict():
  imagefile = request.files['flowerimage']
  image_path = "static" + imagefile.filename
  imagefile.save(image_path)

  # label data
  label = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
           'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Del', 'Nothing', 'Space']
  
  # for images

  #path = ('D:\MBKM-Bangkit Machine Learning\Capstone Product Base\deploy\images.jpg')

  model = tf.keras.models.load_model("D:\MBKM-Bangkit Machine Learning\Capstone Product Base\deploy\model.h5")
  img = image.load_img(image_path, target_size= (64, 64))
  x = image.img_to_array(img)
  x = np.expand_dims(x, axis=0)

  images = np.vstack([x])

  predicted= model.predict(images).squeeze()
  hasil = label[np.argmax(predicted)]


  return render_template('index.html', prediction= hasil, img_file= img)


  
# run app
if __name__ == '__main__':
    app.run(debug=True)
 