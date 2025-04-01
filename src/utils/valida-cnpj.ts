export function validaCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const calcDigito = (base: string, pesos: number[]) => {
        const soma = base.split('').reduce((acc, curr, i) => {
            return acc + parseInt(curr) * pesos[i];
        }, 0);
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.slice(0, 12);
    const digito1 = calcDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digito2 = calcDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return cnpj === base + digito1.toString() + digito2.toString();
}
