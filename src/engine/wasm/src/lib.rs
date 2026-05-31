use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

// 原子数据结构
#[derive(Serialize, Deserialize, Clone)]
pub struct Atom {
    pub id: String,
    pub element: String,
    pub position: [f64; 3],
}

// 化学键数据结构
#[derive(Serialize, Deserialize, Clone)]
pub struct Bond {
    pub id: String,
    pub atom1_id: String,
    pub atom2_id: String,
    pub bond_type: String,
}

// 分子数据结构
#[derive(Serialize, Deserialize, Clone)]
pub struct Molecule {
    pub atoms: Vec<Atom>,
    pub bonds: Vec<Bond>,
}

// 计算两个原子之间的距离
#[wasm_bindgen]
pub fn calculate_distance(pos1: &[f64], pos2: &[f64]) -> f64 {
    let dx = pos1[0] - pos2[0];
    let dy = pos1[1] - pos2[1];
    let dz = pos1[2] - pos2[2];
    (dx * dx + dy * dy + dz * dz).sqrt()
}

// 计算键角
#[wasm_bindgen]
pub fn calculate_angle(pos1: &[f64], pos2: &[f64], pos3: &[f64]) -> f64 {
    let v1 = [pos1[0] - pos2[0], pos1[1] - pos2[1], pos1[2] - pos2[2]];
    let v2 = [pos3[0] - pos2[0], pos3[1] - pos2[1], pos3[2] - pos2[2]];
    
    let dot = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    let mag1 = (v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]).sqrt();
    let mag2 = (v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]).sqrt();
    
    if mag1 == 0.0 || mag2 == 0.0 {
        return 0.0;
    }
    
    let cos_angle = dot / (mag1 * mag2);
    cos_angle.acos() * 180.0 / std::f64::consts::PI
}

// 计算分子量
#[wasm_bindgen]
pub fn calculate_molecular_weight(elements: &str) -> f64 {
    let element_list: Vec<&str> = elements.split(',').collect();
    let mut weight = 0.0;
    
    for element in element_list {
        weight += match element.trim() {
            "H" => 1.008,
            "C" => 12.011,
            "N" => 14.007,
            "O" => 15.999,
            "F" => 18.998,
            "Cl" => 35.453,
            "Br" => 79.904,
            "I" => 126.904,
            "S" => 32.065,
            "P" => 30.974,
            _ => 0.0,
        };
    }
    
    weight
}

// 计算分子中心
#[wasm_bindgen]
pub fn calculate_center_of_mass(positions: &[f64], masses: &[f64]) -> Vec<f64> {
    let n = masses.len();
    let mut cx = 0.0;
    let mut cy = 0.0;
    let mut cz = 0.0;
    let mut total_mass = 0.0;
    
    for i in 0..n {
        let mass = masses[i];
        cx += positions[i * 3] * mass;
        cy += positions[i * 3 + 1] * mass;
        cz += positions[i * 3 + 2] * mass;
        total_mass += mass;
    }
    
    if total_mass > 0.0 {
        cx /= total_mass;
        cy /= total_mass;
        cz /= total_mass;
    }
    
    vec![cx, cy, cz]
}

// 平滑插值
#[wasm_bindgen]
pub fn lerp(start: f64, end: f64, t: f64) -> f64 {
    start + (end - start) * t
}

// 缓动函数
#[wasm_bindgen]
pub fn ease_in_out_cubic(t: f64) -> f64 {
    if t < 0.5 {
        4.0 * t * t * t
    } else {
        1.0 - (-2.0 * t + 2.0).powi(3) / 2.0
    }
}
