import { CATEGORIES } from "./data";

// Stateless: it only renders chips and calls onSelect from props.
export default function CategoryBar({ selected, onSelect }) {
  return (
    <div className="chips">
      {CATEGORIES.map((c) => (
        <button
          key={c}
          className={c === selected ? "chip active" : "chip"}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
