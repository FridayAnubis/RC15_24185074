import pandas as pd

# 读取CSV文件
df = pd.read_csv('HeartRate.csv')

# 将bpm列中小于77的值加20
df.loc[df['bpm'] < 77, 'bpm'] += 20

# 保存到新文件
df.to_csv('HeartRate2.csv', index=False)