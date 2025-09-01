export const formatCurrency = (value?: number) => {
    if (!value) return "Rp. 0";
    return "Rp. " + Number(value).toLocaleString("id-ID");
  };