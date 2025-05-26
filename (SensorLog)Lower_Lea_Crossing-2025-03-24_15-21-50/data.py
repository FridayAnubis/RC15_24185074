import pandas as pd
import numpy as np
from scipy import interpolate

# 加载数据（示例）
gps = pd.read_csv("Location.csv", parse_dates=["time"])
heartbeat = pd.read_csv("HeartRate.csv", parse_dates=["time"])
motion = pd.read_csv("Accelerometer.csv", parse_dates=["time"])
sound = pd.read_csv("Microphone.csv", parse_dates=["time"])

# 时间对齐核心函数
def align_to_gps(data, gps_timestamps, colunm, method='linear'):
    data_sorted = data.sort_values('time')
    interp_func = interpolate.interp1d(
        data_sorted['time'].astype(np.int64),  # 转换为数值避免时间格式问题
        data_sorted[colunm],
        kind=method,
        fill_value="extrapolate" if method == 'nearest' else np.nan
    )
    aligned_values = interp_func(gps_timestamps.astype(np.int64))
    return aligned_values

# 对齐心跳数据（最近邻）
heartbeat_aligned = align_to_gps(heartbeat, gps['time'], method='nearest', colunm='bpm')

# 对齐运动数据（线性插值）
motion_aligned = align_to_gps(motion, gps['time'], method='linear', colunm='motion')

sound_aligned = align_to_gps(sound, gps['time'], method='linear', colunm='dBFS')

# 合并结果
aligned_data = gps.copy()
aligned_data['heartbeat'] = heartbeat_aligned
aligned_data['sound'] = sound_aligned
aligned_data['motion'] = motion_aligned

# 异常检测示例：心率突变过滤
# aligned_data['heartbeat'] = aligned_data['heartbeat'].mask(
#     (aligned_data['heartbeat'].diff().abs() > 30) |
#     (aligned_data['heartbeat'] < 30) |
#     (aligned_data['heartbeat'] > 220)
# )

aligned_data.to_csv("AlignedData.csv")