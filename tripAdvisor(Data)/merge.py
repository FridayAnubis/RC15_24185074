import pandas as pd
import glob

# 获取所有 CSV 文件路径
csv_files = glob.glob('./*.csv')

# 读取并合并（自动跳过重复表头）
dfs = []
for file in csv_files:
    df = pd.read_csv(file)
    dfs.append(df)
merged_df = pd.concat(dfs, ignore_index=True)

# 保存合并后的文件
merged_df.to_csv('merged.csv', index=False)