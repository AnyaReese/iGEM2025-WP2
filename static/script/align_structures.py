import os
import sys
import pymol
from pymol import cmd

# 使用命令行模式（不启动GUI）
pymol.finish_launching(['pymol', '-c'])

try:
    # 设置工作目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 加载结构
    cmd.load(os.path.join(current_dir, "rnf114.pdb"))
    cmd.load(os.path.join(current_dir, "model_1.pdb"))
    
    # 进行对齐
    aln = cmd.align("model_1", "rnf114")
    print(f"Alignment RMSD: {aln[0]:.2f}")
    
    # 保存对齐后的结构
    cmd.save(os.path.join(current_dir, "model_1_aligned.pdb"), "model_1")
    print("Aligned structure saved successfully!")
    
except Exception as e:
    print(f"Error occurred: {str(e)}")
finally:
    # 清理并退出
    cmd.quit()