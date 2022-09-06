# iPhone image sorter

A quick and easy way to sort your photos imported from an iPhone.

It will move your photos to subdirectories (DCIM, Screenshots, Downloads) based on their filenames.

## How to use

You must specify the path where the images are located at.

```bash
node index.js <path>
```

The path must be an absolute path.

```bash
# This will NOT work
node index.js ./images
```

On Windows, you cannot use single backslashes in the path.

```bash
# This will NOT work
node index.js D:\Backup\Images

# You have to use either double backslashes
node index.js D:\\Backup\\Images

# or single forward slashes
node index.js D:/Backup/Images

# or wrap it in quotes
node index.js "D:\Backup\Images"
```