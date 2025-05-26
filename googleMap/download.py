import os
import requests
import pandas as pd
from urllib.parse import urlparse

def download_images_from_csv(csv_path, column_name, output_dir='images', timeout=10):

    os.makedirs(output_dir, exist_ok=True)
    
    df = pd.read_csv(csv_path)
    urls = df[column_name].dropna().tolist()  #culve null
    
    success = 0
    fail = 0
    
    for idx, url in enumerate(urls):
        try:

            response = requests.get(url, timeout=timeout)
            response.raise_for_status()  # check HTTP
            
            
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path)
            if not filename:
                filename = f"image_{idx+1}.jpg"
            
            
            save_path = os.path.join(output_dir, filename)
            with open(save_path, 'wb') as f:
                f.write(response.content)
            
            print(f"Success: {filename}")
            success += 1
            
        except Exception as e:
            print(f"Fail [{url}]: {str(e)}")
            fail += 1
    
    print(f"\nDone | Success: {success}, Fail: {fail}")

download_images_from_csv(
    csv_path='Outscraper-20250306190422s15.csv',
    column_name='original_photo_url',
    output_dir='downloaded_images'
)