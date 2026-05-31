#!/bin/bash
# 编译Rust为WASM

# 检查wasm-pack是否安装
if ! command -v wasm-pack &> /dev/null; then
    echo "Installing wasm-pack..."
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
fi

# 进入Rust项目目录
cd src/engine/wasm

# 编译为WASM
echo "Compiling Rust to WASM..."
wasm-pack build --target web --out-dir ../../../public/wasm

echo "WASM compilation complete!"
echo "Output: public/wasm/"
