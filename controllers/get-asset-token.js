import axios from 'axios';

export const getAssetToken = async (req, res) => {
    try {
        const { code, url } = req.body;

        axios
            .post(
                'https://api.instagram.com/oauth/access_token/',
                {
                    client_id: 1824710184696639,
                    client_secret: '5f79522345433d597b2f9db578f3df9f',
                    grant_type: 'authorization_code',
                    redirect_uri: url,
                    code,
                },
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                        host: 'api.instagram.com',
                    },
                }
            )
            .then((response) => {
                // eslint-disable-next-line no-console
                return res.status(200).send(response);
                // Handle the access token response here
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                return res.status(200).send({ error: error });
                // Handle errors here
            });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
