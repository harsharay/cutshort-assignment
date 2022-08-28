const initialState = {
    currentPageIndex: 0,
    allPagesData: [
        {   
            pageId: 0,
            heading: 'Welcome! First things first...',
            subHeading: 'You can always change later.',
            inputData: [
                {
                    label: 'Full Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Steve Jobs',
                    name: 'fullName',
                },
                {
                    label: 'Display Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Steve',
                    name: 'displayName',
                },
            ],
            buttonText: 'Create Workspace',
        },
        {
            pageId: 1,
            heading: "Let's set up a home for all your work",
            subHeading: 'You can always create another workspace later.',
            inputData: [
                {
                    label: 'Workspace Name',
                    type: 'text',
                    mandatory: true,
                    placeholder: 'Eden',
                    name: 'workspaceName',
                },
                {
                    label: 'Workspace URL',
                    mandatory: true,
                    type: 'text',
                    placeholder: 'Example',
                    name: 'workspaceUrl',
                },
            ],
            buttonText: 'Create Workspace',
        },
        {
            pageId: 2,
            heading: "How are you planning to use Eden?",
            subHeading: "We'll streamline your setup experience accordingly.",
            inputData: [],
            buttonText: 'Create Workspace',
            tabsData: [
                {
                    tabHeading: 'For myself',
                    tabContent: 'Write better. Think more clearly. Stay organized.',
                    id: 0,
                },
                {
                    tabHeading: 'With my team',
                    tabContent: 'Wikis, docs, tasks & projects, all in one place',
                    id: 1,
                }
            ],
        },
        {
            pageId: 3,
            heading: "Congratulations, Eren!",
            subHeading: 'You have completed the onboarding, you can start using Eden!',
            inputData: [],
            buttonText: 'Launch Eden',
            success: true,
        },
    ],
    allPagesInputData: {},
}


export const RootReducer = (state=initialState, action) => {

    if(action.type === 'CHANGE_CURRENT_PAGE') {
        return {
            ...state,
            currentPageIndex: state.currentPageIndex+1,
        }
    }
    if(action.type === 'ADD_INPUT_PAGE_DATA') {
        return {
            ...state,
            allPagesInputData: {...state.allPagesInputData,  ...action.payload}
        }
    }
    if(action.type === 'ADD_SINGLE_CARD_INPUT') {
        return {
            ...state,
            allPagesInputData: {...state.allPagesInputData, ...{
                [action.payload.key] : action.payload.values
            }}
        }
    }
    if(action.type === 'NAVIGATE_STEPPER') {
        return {
            ...state,
            currentPageIndex: action.payload
        }
    }


    return state;
}