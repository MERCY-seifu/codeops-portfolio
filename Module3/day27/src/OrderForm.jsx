import { useState } from "react";

// TeleBirr runs on Ethio telecom numbers: 09XXXXXXXX or +2519XXXXXXXX
const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export default function OrderForm({ total }) {
  // Step 5: one state object for all fields
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [placed, setPlaced] = useState(false);
  console.log("OrderForm form =", form);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Step 6: live validation
  const phoneValid = TELEBIRR.test(form.phone.trim());
  const canSubmit =
    form.name.trim() !== "" && form.area.trim() !== "" && phoneValid && total > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (canSubmit) setPlaced(true);
  }

  if (placed) {
    return (
      <p className="success">
        Thanks {form.name}! {total} ETB will be requested from {form.phone} via
        TeleBirr. Delivering to {form.area}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h2>Delivery details</h2>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        TeleBirr number
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344"
        />
      </label>
      {form.phone && !phoneValid && (
        <p className="error">Enter a valid number like 0911223344 or +251911223344.</p>
      )}
      <label>
        Area
        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          placeholder="Bole, Piassa, ..."
        />
      </label>
      <button type="submit" disabled={!canSubmit}>
        Pay {total} ETB with TeleBirr
      </button>
    </form>
  );
}
