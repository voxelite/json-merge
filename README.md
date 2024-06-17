# Voxelite JSON Merger

GitHub Action to merge [Voxelite](https://github.com/voxelite)'s `block.json` (main JSON) with all JSONs in `block` directory.
The same can be done for items, entities...

## Inputs

### `in-file`

Path to your `block.json` (or equivalent).

This is your main file with data.
Inside the file you should have a JSON Object with keys for codenames and their values an object with all the configuration.

### `in-directory`

Path to your directory containing all object files.
Inside each object (like a block) is represented by a single JSON file.
Name of the file is used as the object's name and inside is a JSON Object with all the configuration.

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
