const API_BASE = process.env.REACT_APP_API_BASE;

export default class ApiGateway {
  get = async (path = "") => {
    const response = await fetch(`${API_BASE}${path}`);
    const dto = await response.json();
    return dto;
  };

  post = async (payload) => {
    const response = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dto = await response.json();
    return dto;
  };

  reset = async () => {
    const response = await fetch(`${API_BASE}/reset`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const dto = await response.json();
    return dto;
  };
}
