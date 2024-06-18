# Voxelite JSON Merger

GitHub Action to merge [Voxelite](https://voxelite.net)'s `block.json` (main JSON) with all JSONs in `block` directory.
The same can be done for items, entities...

This is intended to allow two different approaches of object management (all objects of same type in single file and one file per object) to be used at the same time.
It also minimizes the JSON by removing unimportant new lines and whitespaces (harder to read for humans but still valid JSON).

## Inputs

### `in-file`

Path to your multi-object file - `block.json` (or equivalent for other object types).

This is your main file with data.
Inside the file you should have a JSON Object with keys for codenames and their values an object with all the configuration.

Leave empty when you don't have multi-object file.

### `in-directory`

Path to your directory containing all single-object files.
Inside each JSON file is a single object (like a block or item).

Name of the file is used as the object's name and inside is a JSON Object with all the configuration.

Leave empty when you don't have directory of single-object files.

### `out-file`

**Required**

File to write the output JSON into.

## Example usage

```yaml
- name: block.json merging
  uses: voxelite/json-merge@v1
  with:
    in-file: block.json
    in-directory: block
    out-file: out_block.json
```

For object format (block, item, entity...) look into official documentation.
