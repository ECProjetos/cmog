export function validaTelefone(telefone: string): boolean {
    const somenteNumeros = telefone.replace(/[^\d]+/g, '');

    // Valida celular e fixo com DDD (10 ou 11 dígitos)
    const regex = /^(\d{10}|\d{11})$/;

    return regex.test(somenteNumeros);
}
