
def calculate_parity(bin_num):
    return bin_num.count('1') % 2

if __name__=='__main__':
    num = 57
    bin_num = "{0:b}".format(num)
    print(bin_num)
    print(calculate_parity(bin_num))

