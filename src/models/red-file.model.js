export default (sequelize, Sequelize) => {
    return sequelize.define('red_file', {
            reference_code: {
                type: Sequelize.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
            country_code: {
                type: Sequelize.STRING(255),
            },
            institution: {
                type: Sequelize.STRING(255),
            },
            dependency: {
                type: Sequelize.STRING(255),
            },
            document_type: {
                type: Sequelize.STRING(255),
            },
            title: {
                type: Sequelize.STRING(255),
            },
            place_and_date: {
                type: Sequelize.STRING(255),
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            precedence: {
                type: Sequelize.TEXT,
            },
            language: {
                type: Sequelize.STRING(255),
                defaultValue: 'Español',
            },
            physical_characteristics: {
                type: Sequelize.STRING(255),
            },
            volume: {
                type: Sequelize.STRING(255),
            },
            notes: {
                type: Sequelize.TEXT,
            },
        },
        {
            timestamps: false,
            tableName: 'red_file'
        });
};
