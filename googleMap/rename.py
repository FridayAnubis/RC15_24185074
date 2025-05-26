import os

def add_jpg_extension(folder_path):
    """
    给无扩展名的文件添加 .jpg 后缀
    :param folder_path: 需要处理的文件夹路径
    """
    count = 0
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        
        # 只处理文件（跳过文件夹）
        if os.path.isfile(file_path):
            # 检查是否没有扩展名
            name, ext = os.path.splitext(filename)
            if not ext:
                new_name = name + ".jpg"
                new_path = os.path.join(folder_path, new_name)
                os.rename(file_path, new_path)
                print(f"✅ 已重命名: {filename} → {new_name}")
                count += 1
    
    print(f"\n操作完成 | 共处理 {count} 个文件")

# 使用示例
add_jpg_extension("downloaded_images/")  # 替换为实际文件夹路径