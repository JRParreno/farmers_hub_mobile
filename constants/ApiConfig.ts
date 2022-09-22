export default function ApiConfig() {

    if (__DEV__) {
        return {
            clientId: 'YFHrJ90mPIudz6hevJS02crslY9N4J8GoFHbqdat',
            clientSecret: 'YcUoWYnu1vLIb4TyT60Q44douV3wKCrmLIbFhixpns1grlfEdfpS0ilyNCniISiYfvGj1HoYdqIkGMAXnd9YaRX6wZJhXeS6goUsqrQ7UkdNEOw8cGP9BBewLHBe8fpt',
            apiUrl: 'http://192.168.100.14:8000/api',
            url: 'http://192.168.100.14:8000/',
            media: 'http://192.168.100.14:8000',
        }
    }
    return {
        clientId: 'YFHrJ90mPIudz6hevJS02crslY9N4J8GoFHbqdat',
        clientSecret: 'YcUoWYnu1vLIb4TyT60Q44douV3wKCrmLIbFhixpns1grlfEdfpS0ilyNCniISiYfvGj1HoYdqIkGMAXnd9YaRX6wZJhXeS6goUsqrQ7UkdNEOw8cGP9BBewLHBe8fpt',
        apiUrl: 'http://192.168.1.3:8000/api',
        url: 'http://192.168.1.3:8000/',
        media: 'http://192.168.1.3:8000',
    }
}