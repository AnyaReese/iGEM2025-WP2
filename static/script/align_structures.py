import os
# import sys
import pymol
from pymol import cmd
import argparse

def align_structures(ref_name, mobile_name):
    # use command line mode
    pymol.finish_launching(['pymol', '-c'])

    try:
        # set working directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # construct file paths
        ref_path = os.path.join(current_dir, f"{ref_name}.pdb")
        mobile_path = os.path.join(current_dir, f"{mobile_name}.pdb")
        output_path = os.path.join(current_dir, f"{mobile_name}_aligned.pdb")
        
        # check if input files exist
        if not os.path.exists(ref_path):
            raise FileNotFoundError(f"Reference structure not found: {ref_path}")
        if not os.path.exists(mobile_path):
            raise FileNotFoundError(f"Mobile structure not found: {mobile_path}")
        
        # load structures
        cmd.load(ref_path, ref_name)
        cmd.load(mobile_path, mobile_name)
        
        # align structures
        aln = cmd.align(mobile_name, ref_name)
        print(f"Alignment RMSD: {aln[0]:.2f}")
        
        # save aligned structure
        cmd.save(output_path, mobile_name)
        print(f"Aligned structure saved as: {output_path}")
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")
    finally:
        # clean up
        cmd.quit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Align two PDB structures')
    parser.add_argument('ref', help='Reference structure name (without .pdb)')
    parser.add_argument('mobile', help='Mobile structure name (without .pdb)')
    
    args = parser.parse_args()
    align_structures(args.ref, args.mobile)