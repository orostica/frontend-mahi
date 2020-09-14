class MoneyResource {
	convertIntegerToMoney = value => {
		if (value === null || value === undefined || typeof value !== 'number') {
			return null;
		}

		return value === 0 ? '0,00' : this.format(value);
	};

	convertStringToMoney = value => {
		if (typeof value !== 'string') {
			return null;
		}

		const cleanValue = value.replace(/\D/g, '');
		return cleanValue === '00' || cleanValue === '' ? '' : this.format(cleanValue);
	};

	getRawValue = value => {
		if (!value || typeof value !== 'string') {
			return null;
		}

		return value.replace(/\D/g, '');
	};

	format = value => {
		const num = value * 1;
		const positivenum = num >= 0 ? num / 100 : (num * -1) / 100;

		return (
			positivenum
				.toFixed(2)
				.replace('.', ',')
				// eslint-disable-next-line
				.replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
		);
	};

	/**
	 * Método retirado do blog https://metring.com.br/arredondar-numero-em-javascript
	 * Método criado por A Kunin https://stackoverflow.com/users/1736537/a-kunin
	 * @param {number} num número a ser arrendondado
	 * @param {number} places número de casas para o arredondamento.
	 */
	round = (num, places) => {
		if (!`${num}`.includes('e')) {
			return +`${Math.round(`${num}e+${places}`)}e-${places}`;
		}
		const arr = `${num}`.split('e');
		let sig = '';
		if (+arr[1] + places > 0) {
			sig = '+';
		}

		return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + places}`)}e-${places}`;
	};
}

export default new MoneyResource();
