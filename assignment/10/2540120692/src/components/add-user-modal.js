import modalStyles from "./css/add-user-modal.module.css";

export default function AddUserModal({
  form = {},
  handleChange = () => {},
  setShowModal = () => {},
  handleSubmit = () => {},
}) {
  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modal}>
        <button
          className={modalStyles.close}
          onClick={() => setShowModal(false)}
          title="Close"
        >
          &times;
        </button>
        <h2 className={modalStyles.title}>Add User</h2>
        <form onSubmit={handleSubmit} className={modalStyles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              min="0"
              required
            />
          </label>
          <button type="submit" className={modalStyles.submit}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
